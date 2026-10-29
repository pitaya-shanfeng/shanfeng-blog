import { h } from "hastscript";
import { visit } from "unist-util-visit";

const ADMONITION_TYPES = [
	"note",
	"tip",
	"important",
	"warning",
	"caution",
	"abstract",
	"summary",
	"tldr",
	"info",
	"todo",
	"success",
	"check",
	"done",
	"question",
	"help",
	"faq",
	"attention",
	"failure",
	"missing",
	"fail",
	"danger",
	"error",
	"bug",
	"example",
	"quote",
	"cite",
];

export function parseDirectiveNode() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
				const name = node.name ? node.name.toLowerCase() : "";

				// remark-directive 的 name 语法允许数字开头，于是正文里任何「HH:MM」
				// 都会被切成 textDirective：`10-27 08:22（2 小时前）` 里的 `:22`
				// 变成 name="22"，再走下面的 else 分支转成 <22></22>，浏览器当成
				// 未知空标签渲染 —— 时间就显示成「08<22>（2 小时前）」，少了后半截。
				// 同理「转化率 30:70」「比例 3:1」也会中招。
				// 组件名不可能以数字开头，这一类一律还原成普通文本。
				// 带 label 的（`:00[内容]`）不在还原范围内，保持原逻辑，避免吞内容。
				if (/^\d/.test(name) && !node.children?.length) {
					node.type = "text";
					node.value = `:${node.name}`;
					delete node.name;
					delete node.attributes;
					delete node.data;
					return;
				}

				// 检查是否是 Admonition 类型
				// 仅对 containerDirective 进行 Admonition 转换
				if (
					node.type === "containerDirective" &&
					ADMONITION_TYPES.includes(name)
				) {
					const type = name.toUpperCase();

					// 处理 label (自定义标题)
					const firstChild = node.children[0];
					if (firstChild?.data?.directiveLabel) {
						// 如果有 label，注入 [!TYPE] 到 label 开头
						if (
							firstChild.children.length > 0 &&
							firstChild.children[0].type === "text"
						) {
							firstChild.children[0].value = `[!${type}] ${firstChild.children[0].value}`;
						} else {
							firstChild.children.unshift({
								type: "text",
								value: `[!${type}] `,
							});
						}
					} else {
						// 没有 label，插入包含 [!TYPE] 的新段落作为第一个子节点
						node.children.unshift({
							type: "paragraph",
							children: [{ type: "text", value: `[!${type}]` }],
						});
					}

					// 转换为 Blockquote
					node.type = "blockquote";
					node.data = node.data || {};
					node.data.hName = "blockquote";
					// 关键：清除可能存在的 hProperties，防止变为自定义标签
					delete node.data.hProperties;
				} else {
					// 其他 Directive，保留原有逻辑：转换为自定义 HTML 标签
					const data = node.data || {};
					node.data = data;
					node.attributes = node.attributes || {};

					// Add specific attributes for directive labels
					if (
						node.children.length > 0 &&
						node.children[0].data &&
						node.children[0].data.directiveLabel
					) {
						node.attributes["has-directive-label"] = true;
					}

					const hast = h(node.name, node.attributes);
					data.hName = hast.tagName;
					data.hProperties = hast.properties;
				}
			}
		});
	};
}
