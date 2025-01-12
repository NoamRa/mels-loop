import React from "react";
import ContentComponent from "../content-component";
import {
	ContentComponentProps,
	IMLParsedNode,
} from "../../../interfaces/models";
import { mlUtils } from "../../../lib/ml-utils";
import { st, classes } from "./content-iterator.st.css";

/**
 * Displays the content of a Content Node, optionally wrapping
 * them with a provided tag. Handles the case of a node with text
 * content.
 * @returns
 */
export const ContentIterator = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;

	if (!node) {
		console.warn("Content Iterator: no input node");
		return <div className={classes.noData}></div>;
	}

	const elements: IMLParsedNode[] =
		Array.isArray(node.children) && node.children;
	const Tag = componentData.tag as keyof JSX.IntrinsicElements;

	if (!elements?.length) {
		if (node.text) {
			if (Tag) {
				return (
					<Tag className={className} key={mlUtils.uniqueId()}>
						{node.text}
					</Tag>
				);
			}

			return <span className={className}>{node.text}</span>;
		}
		return <span></span>;
	}

	if (Tag) {
		return (
			<Tag className={st(classes[Tag], className)} key={mlUtils.uniqueId()}>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							componentData={{ node }}
							className={className}
						/>
					);
				})}
			</Tag>
		);
	} else {
		return (
			<>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							componentData={{ node }}
							className={className}
						/>
					);
				})}
			</>
		);
	}
};

export default ContentIterator;
