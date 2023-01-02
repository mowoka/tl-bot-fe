import { FormUserTeknisi } from "../../hooks/teknisi-management/useTeknisiUser";



export const userTeknisiFormValidator = (form: FormUserTeknisi): { valid: boolean, message: string } => {
    if (!form.nik) return { valid: false, message: 'nik tidak boleh kosong' }
    if (!form.name) return { valid: false, message: 'nama tidak boleh kosong' }
    if (!form.idTelegram) return { valid: false, message: 'ID Telegram tidak boleh kosong' }
    if (!form.partner) return { valid: false, message: 'partner tidak boleh kosong' }
    if (!form.sector) return { valid: false, message: 'sector tidak boleh kosong' }
    if (!form.regional) return { valid: false, message: 'regional tidak boleh kosong' }
    if (!form.witel) return { valid: false, message: 'witel tidak boleh kosong' }
    return { valid: true, message: '' }
}