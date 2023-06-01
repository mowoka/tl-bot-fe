import { FormTeamLeadUser } from "@app/hooks/team-lead-management/useTeamLeadManagement";
import { FormDataProps } from "../../hooks/board/useBoard";
import { FormUserTeknisi } from "../../hooks/teknisi-management/useTeknisiUser";

export const userTeknisiFormValidator = (form: FormUserTeknisi): { valid: boolean, message: string } => {
    if (!form.nik) return { valid: false, message: 'NIK tidak boleh kosong' }
    if (!form.name) return { valid: false, message: 'nama tidak boleh kosong' }
    if (!form.idTelegram) return { valid: false, message: 'ID Telegram tidak boleh kosong' }
    if (!form.partner_id) return { valid: false, message: 'partner tidak boleh kosong' }
    if (!form.sector_id) return { valid: false, message: 'sector tidak boleh kosong' }
    if (!form.regional_id) return { valid: false, message: 'regional tidak boleh kosong' }
    if (!form.witel_id) return { valid: false, message: 'witel tidak boleh kosong' }
    return { valid: true, message: '' }
}

export const formTLBoardValidator = (form: FormDataProps): { valid: boolean, message: string } => {
    if (!form.teknisiUserId) return { valid: false, message: 'mohon pilih teknisi' }
    if (!form.jobId) return { valid: false, message: 'mohon pilih tugas' }

    return { valid: true, message: '' }
}

export const validateNikForm = (nik: string): { valid: boolean, message: string } => {
    if (!nik) return { valid: false, message: 'NIK tidak boleh kosong' }
    if (nik.length < 16) return { valid: false, message: 'minimal NIK 16 character' }
    return { valid: true, message: '' }
}

export const teamLeadUserFormValidator = (form: FormTeamLeadUser): { valid: boolean, message: string } => {
    if (!form.nik) return { valid: false, message: 'NIK tidak boleh kosong' }
    if (!form.name) return { valid: false, message: 'nama tidak boleh kosong' }
    if (!form.partner_id) return { valid: false, message: 'partner tidak boleh kosong' }
    if (!form.sector_id) return { valid: false, message: 'sector tidak boleh kosong' }
    if (!form.regional_id) return { valid: false, message: 'regional tidak boleh kosong' }
    if (!form.witel_id) return { valid: false, message: 'witel tidak boleh kosong' }
    if (!form.password) return { valid: false, message: 'password tidak boleh kosong' }
    if (form.password.length < 8) return { valid: false, message: 'password minimal 8 character' }

    return { valid: true, message: '' }
}