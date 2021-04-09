// ==========================================================================
// Generic module
// ==========================================================================
import AbstractModule from './AbstractModule';

export default class extends AbstractModule {
    constructor (options) {
        super(options);
    }

    // Destroy
    // ==========================================================================
    destroy() {
        this.$el.off();
    }
}
