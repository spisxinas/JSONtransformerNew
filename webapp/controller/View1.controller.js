sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("jsontransformer.controller.View1", {
        onInit: function () {

        },
        onTransform: function () {
            var oView = this.getView();
            var sJsonInput = oView.byId("jsonInput").getValue();

            try {
                var oJsonObject = JSON.parse(sJsonInput);

                
                if (typeof oJsonObject === "string") {
                   
                    JSON.parse(oJsonObject);
                    throw new Error("Input is already a stringified JSON object");
                }

                var sJsonString = JSON.stringify(oJsonObject);
                var sEscapedJsonString = JSON.stringify(sJsonString);
                oView.byId("stringOutput").setValue(sEscapedJsonString);
                MessageToast.show("Transformation successful!");
            } catch (e) {
                oView.byId("stringOutput").setValue("");
                MessageToast.show("Invalid JSON input!");
            }
        },
        onDownload: function () {
            var oView = this.getView();
            var sJsonString = oView.byId("stringOutput").getValue();

            if (sJsonString) {
                var blob = new Blob([sJsonString], { type: "text/plain;charset=utf-8" });
                var url = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = "JSONTransformer.txt";
                a.click();
                URL.revokeObjectURL(url);
                MessageToast.show("Download started!");
            } else {
                MessageToast.show("Nothing to download!");
            }
        },
        onReverseTransform: function () {
            var oView = this.getView();
            var sEscapedJsonString = oView.byId("jsonInput").getValue();

            try {
                
                var sJsonString = JSON.parse(sEscapedJsonString);
                
                var oJsonObject = JSON.parse(sJsonString);
                
                
                var sPrettyJson = JSON.stringify(oJsonObject);
                
                oView.byId("stringOutput").setValue(sPrettyJson);
                MessageToast.show("Reverse transformation successful!");
            } catch (e) {
                oView.byId("stringOutput").setValue("");
                MessageToast.show("Invalid escaped JSON string!");
            }
        },
        onCopy: function () {
            var oView = this.getView();
            var sTextToCopy = oView.byId("stringOutput").getValue();
            navigator.clipboard.writeText(sTextToCopy).then(function () {
                MessageToast.show("Content copied to clipboard!");
            }, function (err) {
                MessageToast.show("Failed to copy content.");
            });
        },
        onFileUpload: function (oEvent) {
            var oFileUploader = oEvent.getSource();
            var oFile = oEvent.getParameter("files")[0];
            if (oFile) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var sContent = e.target.result;
                    var oView = this.getView();
                    oView.byId("jsonInput").setValue(sContent);
                }.bind(this);
                reader.readAsText(oFile);
            }
        },
        onToggleFormat: function () {
            var oView = this.getView();
            var sJsonOutput = oView.byId("stringOutput").getValue();

            try {
                var oJsonObject = JSON.parse(sJsonOutput);

                
                if (sJsonOutput.includes("\n")) {
                    
                    var sUnformattedJson = JSON.stringify(oJsonObject);
                    oView.byId("stringOutput").setValue(sUnformattedJson);
                    
                } else {
                    
                    var sFormattedJson = JSON.stringify(oJsonObject, null, 4);
                    oView.byId("stringOutput").setValue(sFormattedJson);
                    
                }
            } catch (e) {
                MessageToast.show("Invalid JSON content!");
            }
        },
        onClear: function () {
            var oView = this.getView();
            oView.byId("jsonInput").setValue("");
            oView.byId("stringOutput").setValue("");
            oView.byId("fileUploader").clear();
            MessageToast.show("Content cleared!");
        }
    });
});
