/**
 * General utility functions
 */
export interface IMLUtils {
	uniqueId(prefix?: string): string;

	arrayToMap<T>(array: Array<T>, field: string): { [key: string]: T };

	stringArrayToMap(array: Array<string>): { [key: string]: 1 };

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	flattenArray(arr: Array<any>): [];
}

class MLUtils implements IMLUtils {
	private readonly seed = `mlid-${String(Date.now() % 1000)}`;
	private nextNumber = Math.round(Date.now() % 1000);
	public uniqueId(prefix?: string): string {
		return `${prefix || this.seed}-${this.nextNumber++}`;
	}

	public arrayToMap<T>(array: Array<T>, field: string): { [key: string]: T } {
		const map: { [key: string]: T } = array.reduce((acc, elem) => {
			const value = elem && elem[field];
			if (value !== null && value !== undefined) {
				acc[String(value)] = elem;
			}
			return acc;
		}, {});

		return map;
	}

	public stringArrayToMap(array: Array<string>): { [key: string]: 1 } {
		return array.reduce((acc, str) => {
			acc[str] = 1;
			return acc;
		}, {});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public flattenArray(arr: Array<any>) {
		return arr.reduce((flat, toFlatten) => {
			return flat.concat(
				Array.isArray(toFlatten) ? this.flattenArray(toFlatten) : toFlatten
			);
		}, []);
	}
}

export const mlUtils: IMLUtils = new MLUtils();
