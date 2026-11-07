/**
 * 静态素材（public/assets）的托管地址
 *
 * 站点正文里的图片都在 public/assets 下，加起来 800 MB 左右，不适合跟着
 * 仓库和构建产物一起走。做法是放到对象存储 + CDN，构建完把 HTML 里的
 * /assets/ 前缀改写成这里的地址。
 *
 * - 留空 → 一切照旧，本地 /assets/ 直接访问（开发、临时没配 CDN 时）
 * - 填上 → 构建产物里的 /assets/... 全部指向该地址（例如
 *   "https://img.shanfengpm.com/assets"）
 *
 * 改写逻辑在 scripts/rewrite-assets-cdn.mjs，构建后自动跑（见 package.json）。
 */
export const ASSETS_CDN_BASE = "https://shanfeng-assets-1524458506.cos.ap-shanghai.myqcloud.com";
