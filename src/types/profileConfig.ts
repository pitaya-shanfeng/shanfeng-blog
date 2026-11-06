export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	/** 联系方式：填了就在卡片底部显示「微信 / 邮箱」两行，替代图标入口 */
	contact?: {
		wechat?: string;
		email?: string;
	};
	links: {
		name: string;
		url: string;
		icon: string;
		showName?: boolean;
	}[];
};
