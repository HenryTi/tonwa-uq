import { UQsLoader } from "./uqsLoader";
export async function createUQsMan(net, appVersion, uqConfigs, uqsSchema) {
    let uqsLoader = new UQsLoader(net, appVersion, uqConfigs, uqsSchema);
    //let initErrors = 
    await uqsLoader.build();
    /*
    if (initErrors) {
        console.error(initErrors);
        throw initErrors;
    }
    */
    return uqsLoader.uqsMan;
}
//# sourceMappingURL=createUQsMan.js.map