class ArdaLib {
    static validateForm(form) {
        let inputs = form.querySelectorAll("input, textarea");
        for (let input of inputs) {
            if (input.type == "email") {
                let result = this.checkEmail(input.value);
                if (result.error) return { error: "E-posta hatalı. " + result.error };
                continue;
            }
            if (input.type == "tel") {
                let result = this.checkPhone(input.value);
                if (result.error) return { error: "Telefon numarası hatalı. " + result.error };
                continue;
            }
            if (input.value.trim().length == 0) return { error: "Boş alan bırakmayın." };
        }
        return { success: true };
    }

    static checkEmail(email) {
        // return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        if (!email.includes("@")) return { error: "@ işareti eksik." };
        let parts = email.split("@");
        if (parts[0].length == 0) return { error: "Kullanıcı adı eksik." };
        if (parts[1].length == 0) return { error: "Alan adı eksik." };
        if (parts[1].length < 3) return { error: "Geçerli bir alan adı değil." };
        if (!parts[1].slice(1, -1).includes(".")) return { error: "Alan adı uzantısı eksik." };
        if (!parts[1].slice(1, -2).includes(".")) return { error: "Alan adı uzantısı geçerli değil." };

        // bazı işlemlerin yerini değiştirerek hatta sadece ilk satırdaki regex'i kullanarak her şeyi hızlandırabiliriz ama ben detaylı hata mesajı vermek istedim.

        return { success: true };
    }

    static numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    static checkPhone(phone) {
        // return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{2})[-. ]*(\d{2})(?: *x(\d+))?\s*$/.test(phone);
        phone = phone.replaceAll(" ", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll("+", "");
        if (![...phone].every(e => this.numbers.includes(e))) return { error: "Geçersiz karakter içeriyor." };
        if (phone.startsWith("0") && phone.length != 11) return { error: "Eksik veya fazla numara içeriyor." };
        if (!phone.startsWith("0") && phone.length != 12) return { error: "Eksik veya fazla numara içeriyor." };
        
        // bazı işlemlerin yerini değiştirerek hatta sadece ilk satırdaki regex'i kullanarak her şeyi hızlandırabiliriz ama ben detaylı hata mesajı vermek istedim.

        return { success: true };
    }

    static toggleTheme() {
        // BU SATIRI SİLME! FeatherCSS'in sınıfları algılaması için önemli.
        // feathercss[bg-black-10 fg-white bg-white-90 fg-black]

        ["bg-black-10", "fg-white", "bg-white-90", "fg-black"].forEach(e => document.body.classList.toggle(e));
    }

    static setTheme(theme) {
        if (!["black", "white"].includes(theme)) throw new Error(`theme parametresi sadece "white" veya "black" olabilir.`);

        if (theme == "white") {
            document.body.classList.remove("bg-black-10", "fg-white");
            document.body.classList.add("bg-white-90", "fg-black");
            return;
        }

        document.body.classList.remove("bg-white-90", "fg-black");
        document.body.classList.add("bg-black-10", "fg-white");
    }

    static toggleMenu() {
        // BU SATIRI SİLME! FeatherCSS'in sınıfları algılaması için önemli.
        // feathercss[fixed t-50p l-50p bg-black-15 border-color-white px-35 py-25 fs-15 translate-center radius-15 text-center fs-15 font-bold mb-05 absolute r-2 t-1 fs-07 cursor-pointer transition-03 fg-red-hover none]

        let menu = document.querySelector("#menu");
        if (menu == null) {
            let div = document.createElement("div");
            div.classList.add(..."fixed t-50p l-50p bg-black-15 border-color-white px-35 py-25 fs-15 translate-center radius-15 text-center".split(" "));
            div.id = "menu";
            
            let header = document.createElement("p");
            header.classList.add(..."fs-15 font-bold mb-05".split(" "));
            header.textContent = "Menü Örneği";

            let text = document.createElement("p");
            text.textContent = "Biraz bildirim kutusu gibi oldu ama olsun, amaç açıp kapatabilmekti.";

            let closeButton = document.createElement("div");
            closeButton.classList.add(..."absolute r-2 t-1 fs-07 cursor-pointer transition-03 fg-red-hover".split(" "));
            closeButton.textContent = "x";
            closeButton.addEventListener("click", this.toggleMenu);

            div.append(header, text, closeButton);

            document.body.appendChild(div);
            return;
        }

        menu.remove();
    }
}

const $ = (query) => document.querySelector(query); 

export { ArdaLib, $ };
