type ItemPaket = {
    id_game?: number,
    title_paket?: string,
    harga_paket?: number,
    image_src?: string,
    deskripsi_paket?: string,
    type_paket?: string,
    min_peserta?: number,
    max_peserta?: number,
    durasi?: string,
    is_active?: boolean,
}
type Testimoni = {
    nama_testimoni: string,
    komentar_testimoni: string,
    rating: number,
    is_active: boolean,
}

type FasilitasPaket = {
    id_paket: number,
    nama_fasilitas: string,
}

type Game = {
    nama_game: string,
    deskripsi_game: string,
    lokasi: string,
    is_active: boolean,
}

type Galeri = {
    id_game: number,
    nama_photo: string,
    image_src: string,
    is_active: boolean,
}