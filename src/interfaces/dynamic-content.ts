import { IParsedPageData } from "./models";

/**
 * Types of dynamic content
 */
export enum DynamicContentTypes {
	Glossary = "glossary", Annotation = "annotation"
}

/**
 * describes a dynamic content item: its type and id
 */
export interface IDynamicContentRecord {
	/**
	 * Annotation, gloassary etc
	 */
	type: DynamicContentTypes;
	/**
	 * The id of the item to fetch
	 */
	id: string;
}

export interface IDynamicContentServer {
	/**
	 * Retrieve parsed page data for each id, given local and content type
	 * @param type 
	 * @param locale 
	 * @param ids 
	 */
	getItems(type: DynamicContentTypes, locale: string, ids: Array<string>): Promise<IParsedPageData[]>;
	/**
	 * Extract content type and id from a url, with a default content type
	 * @param url 
	 * @param defaultType 
	 */
	urlToContentData(url: string, defaultType?: DynamicContentTypes): IDynamicContentRecord;
}