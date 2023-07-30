import * as mm from 'music-metadata-browser';
import { Buffer } from 'buffer';
import process from 'process';
import { base64ImgSrc } from '../../public/noImg.js';
globalThis.Buffer = Buffer;
globalThis.process = process;
export class Parser {
	public async getArtwork(path: string) {
		const md = await mm.fetchFromUrl(path);
		const base64Data = md?.common.picture?.[0]?.data?.toString('base64');
		const imageUrl = base64Data ? 'data:image/png;base64,' + base64Data : base64ImgSrc;
		return imageUrl;
	}

	public async getBasicMetadata(path: string) {
		const md = await mm.fetchFromUrl(path);
		return {
			title: md.common.title ?? '曲名が設定されていません',
			artist: md.common.artist ?? 'Unknown',
			album: md.common.album ?? 'Single',
		};
	}

	public async getFullMetadata(path: string) {
		const md = await mm.fetchFromUrl(path);

		// フォーマット情報を出力
		const format = md.format;

		// ネイティブタグを出力
		const nativeTag = md.native;

		// 共通タグ情報を出力
		const commonTag = md.common;

		return [format, nativeTag, commonTag];
	}
}
