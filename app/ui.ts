export default class UI {
    public static width = 600;
    public static height = 600;
    private modalWrapper: HTMLElement;

    constructor() {
        this.modalWrapper = document.getElementById('modal-wrapper');
    }

    public showModal(id) {
        const el = document.getElementById(id);
        this.show(this.modalWrapper);
        this.show(el);
    }

    private show(el: HTMLElement): HTMLElement {
        el.style.display = '';
        return el;
    }

    private hide(el: HTMLElement): HTMLElement {
        el.style.display = '';
        return el;
    }
}
