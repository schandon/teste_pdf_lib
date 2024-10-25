import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile} from 'fs/promises';
import { join } from 'path';



interface TestEquipment {
    type: string;
    model: string;
    service_number: string;
}


const vessel_name = 'vessel_name';
const registry_port = 'country_name';
const call_sign = 'call_sign';


const service_report_form_data =
{
    vessel :
    {
        [vessel_name]: vessel_name,
        [registry_port]: registry_port,
        [call_sign]: call_sign
    }
}


service_report_form_data.vessel.vessel_name = 'GABIRU MELANCÓLICO';
service_report_form_data.vessel.country_name = "RatLand";
service_report_form_data.vessel.call_sign = "XPTO";

const vessel = service_report_form_data.vessel;

console.log(service_report_form_data);




const test_equipment: TestEquipment[] = [];



const service_report =
{
    vessel:  vessel,
    test_equipment: test_equipment
};

test_equipment.push( 
{
    type: 'EPIRB TESTER',
    model: 'BT MINI',
    service_number: '181034'
});
test_equipment.push({
    type: 'AIS TESTER',
    model: 'MUSSON M1',
    service_number: '12916'
});
test_equipment.push(
{
    type: 'BEACON TESTER',
    model: 'SEACOM',
    service_number: 'SR1241'
});

console.log(service_report);


async function createPdf(input: string, output: string)
{
    try
    {
        const pdfDoc = await PDFDocument.load(await readFile(input));
        
        // Get Number of fields
        let field_names = pdfDoc.getForm().getFields();        
        const field_names_string = field_names.map( field => field.getName());

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

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);


    } catch (error)
    {
        console.error(error);   
    }
}

const inputPath = join('src', 'assets', 'OS000000-S_NOME_DO_NAVIO_SR_ver2.3_auto_font_size_En.pdf');
const outputPath = join('src', 'result.pdf');


createPdf(inputPath,outputPath);