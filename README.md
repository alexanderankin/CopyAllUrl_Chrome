# Copy All URL for Google Chrome (Manifest Update fork)

CopyAllURL is Google Chrome extension to copy all opened tabs URL to clipboard, and to open multiple URL in the clipboard (paste).

You can install it with the Chrome Web Store

## Usage

when this extension is added, you can use its action icon to:

* copy your window's list of opened tabs to the clipboard
* open all new tabs for all the URLs currently in your clipboard

this makes it easy to store a list of websites and later revisit them.

## This fork

this fork updates the manifest to v3 so that it can be used on the extensions store again

## Contributing

see https://github.com/alexanderankin/CopyAllUrl_Chrome for more details

## publishing

to publish on the web store you need to read these pages/perform these steps:

* https://developer.chrome.com/docs/webstore/publish
* https://developer.chrome.com/docs/webstore/register
* https://chrome.google.com/webstore/devconsole
	* `make`
    * upload the resulting zip file

In order to publish beyond a draft the following was required as well:

* A justification for clipboardRead is required. This can be entered on the Privacy practices tab.
* A justification for clipboardWrite is required. This can be entered on the Privacy practices tab.
* A justification for management is required. This can be entered on the Privacy practices tab.
* A justification for notifications is required. This can be entered on the Privacy practices tab.
* A justification for remote code use is required. This can be entered on the Privacy practices tab.
* A justification for tabs is required. This can be entered on the Privacy practices tab.
* At least one screenshot or video is required.
* The single purpose description is required. This can be entered on the Privacy practices tab.
* To publish your item, you must certify that your data usage complies with our Developer Program Policies. You can certify this on the Privacy practices tab of the item edit page.
* You must provide a contact email before you can publish any item. Enter your contact email on the Account tab.
* You must verify your contact email before you can publish any item. Begin the verification process on the Account tab.

justification was provided as given in `justifications.json`.
there is even a script to automatically populate the form, see `Makefile`.
