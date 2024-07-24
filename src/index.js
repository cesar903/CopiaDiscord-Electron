const { app, BrowserWindow, ipcMain } = require("electron")
const { join } = require("path")
const { userInfo } = require("os")
require("./functions/Conexao.js")
const ObterModelo = require("./functions/Modelo.js")
let modelo = null



app.whenReady()
    .then(function () {
        const janela = new BrowserWindow({
            autoHideMenuBar: true,
            minHeight: 580,
            icon: join(__dirname, "/public/icon.png"),
            frame: false,
            title: "Descent",
            minWidth: 920,
            webPreferences: {
                preload: join(__dirname, "preload.js")
            }
        })

        ipcMain.on("AbrirPapo", async function (evento, codigo) {
            modelo = ObterModelo(codigo)
            janela.loadFile(join(__dirname, "/public/PaginaPapo.html"))
        })

        ipcMain.on("Fechar", function () {
            app.quit()
        })

        ipcMain.on("Minimizar", function () {
            janela.minimize()
        })

        ipcMain.on("Maximizar", function () {
            janela.isMaximized() ?
                janela.unmaximize() : janela.maximize()
        })

        ipcMain.on("EnviarMensagem", async function (evento, mensagem) {
            const novaMensagem = new modelo({ nome, mensagem })
            await novaMensagem.save()
        })

        ipcMain.handle("ReceberMensagem", async function () {
            const mensagens = await modelo.find().sort({ tempo: "asc" }).lean()
            return mensagens
        })


        let nome = userInfo().username
        janela.loadFile(join(__dirname, "/public/PaginaInicio.html"))
    })
