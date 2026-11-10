export declare function countWords(text: string): number;
export declare function countChars(text: string): number;
export declare const MINUTES_PER_IMAGE: number;
export declare function countMinutes(words: number, images?: number): number;
export declare function measure(text: string, images?: number): {
	words: number;
	chars: number;
	minutes: number;
};
export declare const WORDS_PER_MINUTE: number;
