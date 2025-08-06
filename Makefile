.PHONY: all
all: manifest.json build/extension.zip build/justifications-script.js

.PHONY: yaml2json
yaml2json:
	@which yaml2json > /dev/null || cargo install yaml2json

manifest.json: manifest.yaml yaml2json
	cat manifest.yaml | yaml2json > $@

popup := $(wildcard popup.*)
img := $(wildcard img/.*)

build/extension.zip: $(popup) $(img) manifest.json
	@mkdir -p build
	@rm -f $@
	zip -q -r $@ popup.* img/ manifest.json

build/justifications-script.js: justifications.json
	@mkdir -p build
	@printf "var justifications = " > $@
	@cat justifications.json | jq -c | tr -d '\n' >> $@
	@printf ";" >> $@
	@echo >> $@
	@echo "Array.from(document.getElementsByTagName('span')).filter(e => e.children.length === 0 && e.innerText.endsWith(' justification')).map(e => ({ e, innerText: e.innerText, textarea: e.parentNode.closest('label').querySelector('textarea') })).forEach(e => e.textarea.value = justifications[e.innerText.replace(' justification', '')]);" >> $@
	@echo >> $@


.PHONY: clean
clean:
	rm -f manifest.json
	rm -rf build/
