'use server'

import { pool } from "@/app/api/db";

export async function getNamaPaket() {

    try {
        const res = await pool.query('SELECT id_paket, title_paket from "item_paket"');
        return res.rows;
    } catch (error) {
        console.error('Error fetching paket data:', error);
        throw new Error('Failed to fetch paket data');
    }
}

export async function getNamaGame() {

    try {
        const res = await pool.query('SELECT id_game, nama_game from "game"');
        return res.rows;
    } catch (error) {
        console.error('Error fetching game data:', error);
        throw new Error('Failed to fetch game data');
    }
}

export async function insertDataPaket(formData: FormData) {
    try {
        const response = await fetch(`${process.env.LOCAL_TEST_API}/api/item-paket`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to insert data');
        }

        return {
            success: true,
            redirectTo: '/dashboard/paket-adventure',
            data: data
        };
    } catch (error) {
        console.error('Error inserting data:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to insert data'
        };
    }
}

export async function insertDataGaleri(formData: FormData) {
    try {
        const response = await fetch(`${process.env.LOCAL_TEST_API}/api/galeri`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to insert data');
        }

        return {
            success: true,
            redirectTo: '/dashboard/galeri',
            data: data
        };
    } catch (error) {
        console.error('Error inserting data:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to insert data'
        };
    }
}

export async function insertDataGame(formData: FormData) {
    try {

        const gameData = {
            nama_game: formData.get('nama_game'),
            deskripsi_game: formData.get('deskripsi_game'),
            lokasi: formData.get('lokasi'),
            is_active: formData.get('is_active') === 'true'
        };


        const response = await fetch(`${process.env.LOCAL_TEST_API}/api/game`, {
            method: 'POST',
            body: JSON.stringify(gameData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to insert data');
        }

        return {
            success: true,
            redirectTo: '/dashboard/game',
            data: data
        };
    } catch (error) {
        console.error('Error inserting data:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to insert data'
        };
    }
}

export async function insertDataFasilitas(formData: FormData) {
    try {

        const fasilitasData = {
            id_paket: Number(formData.get('id_paket')),
            nama_fasilitas: formData.get('nama_fasilitas'),
        };


        const response = await fetch(`${process.env.LOCAL_TEST_API}/api/fasilitas`, {
            method: 'POST',
            body: JSON.stringify(fasilitasData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to insert data');
        }

        return {
            success: true,
            redirectTo: '/dashboard/fasilitas',
            data: data
        };
    } catch (error) {
        console.error('Error inserting data:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to insert data'
        };
    }
}

export async function insertDataTestimoni(formData: FormData) {
    try {

        const testmoniData = {
            nama_testimoni: formData.get('nama_testimoni'),
            komentar_testimoni: formData.get('komentar_testimoni'),
            rating: Number(formData.get('rating')),
            is_active: formData.get('is_active') === 'true'
        };


        const response = await fetch(`${process.env.LOCAL_TEST_API}/api/testimoni`, {
            method: 'POST',
            body: JSON.stringify(testmoniData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to insert data');
        }

        return {
            success: true,
            redirectTo: '/dashboard/testimoni',
            data: data
        };
    } catch (error) {
        console.error('Error inserting data:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to insert data'
        };
    }
}