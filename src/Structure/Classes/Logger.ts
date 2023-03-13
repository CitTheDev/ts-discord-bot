import chalk from "chalk";

export class Logger {
    error(group: string, description: string) {
        return console.log("[ " + getDateInFormat() + " ]" + " | " + chalk.redBright("[ " + group.toUpperCase() + " ]") + " " + chalk.red(description));
    }

    debug(group: string, description: string) {
        return console.log("[ " + getDateInFormat() + " ]" + " | " + chalk.yellowBright("[ " + group.toUpperCase() + " ]") + " " + chalk.cyanBright(description));
    }

    info(group: string, description: string) {
        return console.log("[ " + getDateInFormat() + " ]" + " | " + chalk.greenBright("[ " + group.toUpperCase() + " ]") + " " + chalk.cyanBright(description));
    }

    highlight(text: string, type: "success" | "error") {
        return chalk[type === "success" ? "yellow" : "red"](text);
    }
}

function getDateInFormat() {
    const toString = (number: number, padLength: number) => number.toString().padStart(padLength, "0");

    const date = new Date();

    const dateTimeNow =
        toString(date.getFullYear(), 4)
        + "/" + toString(date.getMonth() + 1, 2)
        + "/" + toString(date.getDate(), 2)
        + " | " + toString(date.getHours(), 2)
        + ":" + toString(date.getMinutes(), 2)
        + ":" + toString(date.getSeconds(), 2);

    return dateTimeNow;
}