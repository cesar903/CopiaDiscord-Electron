const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
    AbrirPapo: function (codigo) {
        ipcRenderer.send("AbrirPapo", codigo)
    },

    Minimizar: function () {
        ipcRenderer.send("Minimizar")
    },
    Maximizar: function () {
        ipcRenderer.send("Maximizar")
    },
    Fechar: function () {
        ipcRenderer.send("Fechar")
    },
    EnviarMensagem: function (mensagem) {
        ipcRenderer.send("EnviarMensagem", mensagem)
    },
    ReceberMensagem: function () {
        return ipcRenderer.invoke("ReceberMensagem")
    }
})

