class FloatingDropdown {
    constructor(trigger, content) {
        this.trigger = trigger;
        this.content = content;

        this.element = document.createElement('div');
        this.element.append(this.trigger, this.content);

        this.content.style.display = 'none';
        this.content.style.position = 'fixed';

        this.trigger.addEventListener('click', () => {
            this.toggleContent();
        });

        document.addEventListener('click', (e) => {
            if (this.#isDropdownElement(e.target)) return;
            this.contentVisible = false;
        });
    }

    get contentVisible() {
        return this.content.style.display === 'none' ? false : true;
    }

    set contentVisible(value) {
        if (value === false) {
            this.content.style.display = 'none';
        } else if (value === true) {
            this.content.style.display = '';
        }
    }

    #isDropdownElement(target) {
        const dropdownElements = Array.from(
            this.element.getElementsByTagName('*')
        );

        const dropdownContainsTarget = dropdownElements.some(
            (element) => element === target
        );

        return dropdownContainsTarget;
    }

    #alignContent() {
        const triggerStart = this.trigger.getBoundingClientRect().left;
        const contentWidth = this.content.getBoundingClientRect().width;
        const viewportWidth = document.documentElement.clientWidth;

        // Sometimes, aligning content to trigger means parts of it go
        // past the viewport and become unviewable.
        if (triggerStart + contentWidth > viewportWidth) {
            // If aligning content to trigger would cause content loss,
            // align it to the right edge of the screen instead
            this.content.style.right = '0px';
            this.content.style.left = '';
        } else {
            // Otherwise, align it to the trigger
            this.content.style.right = 'auto';
            this.content.style.left = 'auto';
        }
    }

    toggleContent() {
        this.contentVisible = !this.contentVisible;
        if (this.contentVisible) this.#alignContent();
    }
}

class Dropdown {
    constructor(trigger, content) {
        this.trigger = trigger;
        this.content = content;

        this.element = document.createElement('div');
        this.element.append(this.trigger, this.content);

        this.content.style.display = 'none';

        this.trigger.addEventListener('click', () => {
            this.toggleContent();
        });

        document.addEventListener('click', (e) => {
            if (this.#isDropdownElement(e.target)) return;
            this.contentVisible = false;
        });
    }

    get contentVisible() {
        return this.content.style.display === 'none' ? false : true;
    }

    set contentVisible(value) {
        if (value === false) {
            this.content.style.display = 'none';
        } else if (value === true) {
            this.content.style.display = '';
        }
    }

    #isDropdownElement(target) {
        const dropdownElements = Array.from(
            this.element.getElementsByTagName('*')
        );

        const dropdownContainsTarget = dropdownElements.some(
            (element) => element === target
        );

        return dropdownContainsTarget;
    }

    toggleContent() {
        this.contentVisible = !this.contentVisible;
    }
}

module.exports.FloatingDropdown = FloatingDropdown;
module.exports.Dropdown = Dropdown;
