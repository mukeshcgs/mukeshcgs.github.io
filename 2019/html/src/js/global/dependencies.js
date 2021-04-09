/* jshint esnext: true */
import { isFunction } from '../utils/is';
import { arrayContains, findByKeyValue, removeFromArray } from '../utils/array';
import { $document } from '../utils/environment';

const DEPENDENCIES = [];

const PREFIX = 'dependency-';

var UUID = 0;

export function addDependency(source, target) {
	var ident = PREFIX + UUID++;

	DEPENDENCIES.push({
		ident: ident,
		target: target,
		source: source
	});

	return ident;
}

export function hasDependencies(ident) {
	var deps = DEPENDENCIES.slice().filter(function(object) {
		if (object.target === ident) {
			return object;
		}
	});
	return deps.length > 0;
}

export function resolveDependency(ident) {
	if (typeof ident  === 'undefined' || ident === '') {
		console.warn('Need ident to resolve dependency.');
		return false;
	}

	var dependency = findByKeyValue(DEPENDENCIES, 'ident', ident)[0];

	if (typeof dependency !== 'undefined') {
		let target = dependency.target;

		removeFromArray(DEPENDENCIES, dependency);

		if (!hasDependencies(target)) {
			$document.trigger('resolveDependencies.' + target);
		}

		return true;
	} else {
		console.warn('Dependency could not be found');
		return false;
	}
}
