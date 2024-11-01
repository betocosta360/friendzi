import { Dimensions } from "react-native";

// Função para obter as dimensões iniciais da tela
let { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

// Atualiza as dimensões ao mudar a orientação da tela
Dimensions.addEventListener("change", ({ window }) => {
    deviceWidth = window.width;
    deviceHeight = window.height;
});

export const hp = (percentage: number) => {
    if (typeof percentage !== 'number' || percentage < 0) {
        console.warn("Porcentagem inválida para hp. Usando valor padrão de 0.");
        return 0;
    }
    return (percentage * deviceHeight) / 100;
};

export const wp = (percentage: number) => {
    if (typeof percentage !== 'number' || percentage < 0) {
        console.warn("Porcentagem inválida para wp. Usando valor padrão de 0.");
        return 0;
    }
    return (percentage * deviceWidth) / 100;
};
