import dealerModals from './dealerModals.js';
import dealerContactOverlay from './dealerContactOverlay.js';

export default class dealerSearchOverlay {

    constructor() {

    }

    static init() {
        const that = this;
        $('.js--dealer--primary-nav--search-toggle').on('click', function() { 
            if(window.isMobileMenuOpen()) {
                window.closeMobileMenu();
            }

            if( $('.dealer-contact--modal').is('.active') ) {
                dealerModals.closeDealerModal('dealer--contact-overlay');
                dealerContactOverlay.closeDealerContactModal();
            }

            if( $(this).is('.active') ) {
                that.closeSearch();
                $('.js--dealer--primary-nav--search-toggle').removeClass('active');
            } else {
                that.openSearch();
                $('.js--dealer--primary-nav--search-toggle').addClass('active');
            }
        });
    }

    static openSearch() {
        dealerModals.openDealerModal('dealer--search-overlay');
    }

    static closeSearch() {
        dealerModals.closeDealerModal('dealer--search-overlay');
    }

}