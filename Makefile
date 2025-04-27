.PHONY: all
all: manifest.json build/extension.zip

.PHONY: yaml2json
yaml2json:
	@which yaml2json > /dev/null || cargo install yaml2json

manifest.json: manifest.yaml yaml2json
	cat manifest.yaml | yaml2json > $@

build/extension.zip: manifest.json
	@mkdir -p build
	zip -q -r $@ img/ vendor/ *.css *.js *.html manifest.json

.PHONY: clean
clean:
	rm -f manifest.json
	rm -f build/extension.zip
