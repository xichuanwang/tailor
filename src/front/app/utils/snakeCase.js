export function toSnakeCase(camelCaseString) {
	return camelCaseString.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
}

export function snakeCaseObjectKeys(object) {
	const result = {}
	for (const key of Object.keys(object)) {
		const value = object[key]
		result[toSnakeCase(key)] = value instanceof Object ? snakeCaseObjectKeys(value) : value 
	}
	return result
}

export function removeSnakeCase(string) {
	return string.replace(/_/g, ' ')
}
