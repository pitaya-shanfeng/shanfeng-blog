/**
 * 备案信息
 *
 * 站内有备案号之后，按工信部要求必须挂在页脚，并链接到 beian.miit.gov.cn。
 * 等管局下发备案号后，把号填进来（例如 "赣ICP备2025012345号-1"），
 * 页脚会自动出现这一条；留空则不渲染任何东西。
 */
export const icpConfig = {
	/** 备案号，形如「赣ICP备2025012345号-1」 */
	number: "",
};

/** 工信部备案查询地址（备案号必须链接到这里） */
export const ICP_QUERY_URL = "https://beian.miit.gov.cn/";
