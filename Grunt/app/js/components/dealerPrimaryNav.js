const hoverIntent = require("hoverintent");

export default class dealerPrimaryNav {
    constructor(el) {
        this.el = el;
        this.topLevelItems  = this.el.querySelectorAll('nav.jcb-main-nav > ul > li');
        console.log('dealerPrimaryNav', this.el);

        this.init();
    }

    init() {
        this.bindMenuItems();
    }

    bindMenuItems() {
        const that = this;
        this.handleItemHover();
    }

    handleItemHover() {
        const that = this;

        if(this.topLevelItems.length > 0) {
            [...this.topLevelItems].forEach(function(item) {

                hoverIntent(item, () => {
                    //mouse in
                    console.log('mouse in');
                    if (item.classList.contains("js--has-children")) {
                        that.openSubmenu(item);
    
                        document.addEventListener('mousemove', function(event) {
                            that.triggerHoverWatch(event);
                        });
                    } else {
                        that.closeSubmenu();
                    }
                }, () => {
                    //mouse out  
                }).options({
                    interval: 150,
                    sensitivity: 30
                });
           });
        }
    }

    triggerHoverWatch(event) {
        console.log('[triggerHoverWatch] ------> bound');

        var e = event.toElement || event.relatedTarget;
        const hoverInsideNav = e.closest('.dealer--primary-nav');

         if(!hoverInsideNav) {
             console.log('hoverIsOutside of Nav ');
             this.closeSubmenu();
         }
    }

    openSubmenu(item) {
        console.log('[openSubmenu] ---------> ', item);
        if(this.topLevelItems.length > 0) {
            [...this.topLevelItems].forEach(function(item) {
                item.classList.remove('active');
            });

            item.classList.add('active');
        }
    }

    closeSubmenu() {
        console.log('[closeSubmenu] ---------> ');
        if(this.topLevelItems.length > 0) {
            [...this.topLevelItems].forEach(function(item) {
                item.classList.remove('active');
            });
    
            document.removeEventListener('mousemove', this.triggerHoverWatch);
        }
    }
}