"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**

 Effectue la connexion à un hôte distant via une session SSH.
 @param session - La session SSH utilisée pour la connexion.
 @returns Une promesse résolue avec un objet de type ExerciceResultType contenant le résultat de la connexion.
 */
function default_1(session) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            name: 'connect-to-host',
            passed: false,
        };
        try {
            // All tests steps (commands to execute, verification... etc... should be here)
            if (session.isConnected()) {
                response.passed = true;
            }
            else {
                throw new SyntaxError(`Cannot connect to host`);
            }
        }
        catch (err) {
            response.error = err.message;
        }
        return response;
    });
}
exports.default = default_1;
