export class Section {
    // конструктор
    constructor(settings, containerSelector) {
        this._items = settings.items;
        this._renderer = settings.renderer;
        this._container = document.querySelector(containerSelector);
    }
    // Метод принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
    // Метод отрисовки всех элементов
    render() {
        this._items.forEach(this._renderer);
    }
}