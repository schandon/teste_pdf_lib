var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const vessel_name = 'vessel_name';
const registry_port = 'country_name';
const call_sign = 'call_sign';
// 'Type',
// 'Model',
//  'Test Equipment - Serial No',
const service_report_form_data = {
    vessel: {
        [vessel_name]: vessel_name,
        [registry_port]: registry_port,
        [call_sign]: call_sign
    }
};
service_report_form_data.vessel.vessel_name = 'GABIRU MELANCÓLICO';
service_report_form_data.vessel.country_name = "RatLand";
service_report_form_data.vessel.call_sign = "XPTO";
const vessel = service_report_form_data.vessel;
console.log(service_report_form_data);
const test_equipment = [];
const service_report = {
    vessel: vessel,
    test_equipment: test_equipment
};
test_equipment.push({
    type: 'EPIRB TESTER',
    model: 'BT MINI',
    service_number: '181034'
});
test_equipment.push({
    type: 'AIS TESTER',
    model: 'MUSSON M1',
    service_number: '12916'
});
test_equipment.push({
    type: 'BEACON TESTER',
    model: 'SEACOM',
    service_number: 'SR1241'
});
console.log(service_report);
// end
function createPdf(input, output) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pdfDoc = yield PDFDocument.load(yield readFile(input));
            // Get Number of fields
            let field_names = pdfDoc.getForm().getFields();
            const field_names_string = field_names.map(field => field.getName());
            console.log(field_names);
            console.log(field_names.length);
            console.log(field_names_string);
            console.log(field_names_string.length);
            const form = pdfDoc.getForm();
            form.getTextField(vessel_name).setText(vessel[vessel_name].toUpperCase());
            form.getTextField(registry_port).setText(vessel.country_name.toUpperCase());
            form.getTextField(call_sign).setText(vessel.call_sign.toUpperCase());
            // Para Dropdown, usamos 
            //form.getDropdown('<field_name>').setText(" ");
            // Zera todos os campos, mas só funciona se só existir Texto no PDF
            // field_names.forEach(field =>
            // {
            //     form.getTextField(field).setText(" ");
            // }    
            // )
            const pdfBytes = yield pdfDoc.save();
            yield writeFile(output, pdfBytes);
        }
        catch (error) {
            console.error(error);
        }
    });
}
// createPdf('C:/Projetos/pdf-lib-teste/assets/OS000000-S_NOME_DO_NAVIO_SR_ver2.3_auto_font_size_En.pdf', 'C:/Projetos/pdf-lib-teste/result.pdf');
const inputPath = join('src', 'assets', 'OS000000-S_NOME_DO_NAVIO_SR_ver2.3_auto_font_size_En.pdf');
const outputPath = join('src', 'result.pdf');
createPdf(inputPath, outputPath);
