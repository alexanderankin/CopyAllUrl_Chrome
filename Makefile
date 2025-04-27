manifest.json: manifest.yaml
	cat manifest.yaml | yaml2json > $@

.PHONY: clean
clean:
	rm manifest.json
