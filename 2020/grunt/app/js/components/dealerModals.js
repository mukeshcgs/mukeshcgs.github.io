
export default class dealerModals {

    static openDealerModal(modalName) {
        console.log('[openDealerModal] ------>', modalName);
        const modal = document.querySelectorAll(`[data-modal="${modalName}"]`);
        $('body').addClass('modal-open');
        $(modal).fadeIn('fast').addClass('active');
        console.log('modal', modal);
    }

    static closeDealerModal(modalName) {
        console.log('[closeDealerModal] ------>', modalName);
        const modal = document.querySelectorAll(`[data-modal="${modalName}"]`);
        $('body').removeClass('modal-open');
        $(modal).fadeOut('fast').removeClass('active');;
        console.log('modal', modal);
    }

}