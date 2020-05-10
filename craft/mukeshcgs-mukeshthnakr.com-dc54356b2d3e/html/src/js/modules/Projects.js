console.log("Projects");
import AbstractModule from "./AbstractModule";

import Ractive from 'ractive';
// ==========================================================================
// Generic module
// ==========================================================================
export default class extends AbstractModule {
    constructor(options) {
        super(options);
        this.elements = {
            $projectList: this.$el.find('.js-project-list')
        };
        this.projectController = this.initProjectController();
        // window.Ractive.DEBUG = false;
    }
    initProjectController() {
        var _this = this;
        var ractive = new Ractive({
            el: this.elements.$projectList,
            template: this.unescapeHTML(this.elements.$projectList.html()),
            data: {
                news: window.newsOptions.news,
                page: window.newsOptions.page,
                nextPage: window.newsOptions.nextPage,
                state: window.newsOptions.state
            },
            transitions: {
                fade
            },
            /**
             * Allows us to set proxy events and run other tasks when controller is initialized
             *
             * @param  {array}  options  Array of options
             */
            oninit: function (options) {
                var _ractive = this;

                this.on({
                    loadMore: (event) => {
                        var parameters = {
                            page: this.get('page')
                        };
                        console.log(parameters);

                        this.set('state', 'loading');
                    }
                })

            },
        });
        return ractive;
    }
};