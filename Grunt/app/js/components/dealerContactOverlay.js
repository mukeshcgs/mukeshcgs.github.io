import dealerModals from './dealerModals.js';

export default class dealerContactOverlay {

    constructor() {

    }

    static init() {
        const that = this;
        console.log('init');
        $('.js--dealer-contact').on('click', function() { 
            if(window.isMobileMenuOpen()) {
                window.closeMobileMenu();
            }

            if( $('.dealer-search--modal').is('.active') ) {
                dealerModals.closeDealerModal('dealer--search-overlay');
            }

            if( $(this).is('.active') ) {
                that.closeDealerContactModal();
            } else {
                that.openDealerContactModal();
            }
        });
    }


    static openDealerContactModal() {
        setTimeout(function() {
            $('.js--dealer-contact').each(function() {
                $(this).find('.chevron-to-cross').addClass('active');
                $(this).addClass('active');
            });
        }, 100);

        dealerModals.openDealerModal('dealer--contact-overlay');
    }

    static closeDealerContactModal() {

        setTimeout(function() {
            $('.js--dealer-contact').each(function() {
                $(this).find('.chevron-to-cross').removeClass('active');
                $(this).removeClass('active');
            });
        }, 100);

        dealerModals.closeDealerModal('dealer--contact-overlay');
    }
    
}



