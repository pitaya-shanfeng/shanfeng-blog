export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	/** 联系方式：填了就在卡片底部显示「微信 / 邮箱」两行，替代图标入口 */
	contact?: {
		/** 微信号（弹窗里作为标题下的说明） */
		wechat?: string;
		/** 微信二维码图片路径；给了才显示「扫码」按钮 */
		wechatQr?: string;
		/** QQ 号 */
		qq?: string;
		/** QQ 二维码图片路径 */
		qqQr?: string;
		email?: string;
	};
	links: {
		name: string;
		url: string;
		icon: string;
		showName?: boolean;
	}[];
};
