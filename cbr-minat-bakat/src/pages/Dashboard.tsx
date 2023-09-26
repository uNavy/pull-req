/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

interface IResult {
    id: number;
    name: string;
    class: string;
    selected_interests: string;
    similarity_score_kl_1: string;
    similarity_score_kl_2: string;
    similarity_score_kl_3: string;
    similarity_score_kl_4: string;
    similarity_score_kl_5: string;
    similarity_score_kl_6: string;
    similarity_score_kl_7: string;
    similarity_score_kl_8: string;
    created_at: string;
    updated_at: string;
}



const Dashboard = () => {
    const navigate = useNavigate()
    const { toast } = useToast();

    const location = useLocation()

    const auth = location?.state?.auth;




    const [dataset, setDataset] = useState<IResult[]>([])

    const getResults = async () => {

        const results = await axios.get('https://api.sistem-pakar-jurusan.my.id/api/results');

        setDataset(results.data.data)


    }


    useEffect(() => {
        toast({
            title: "Login Success",
            description: "Login sebagai admin",
            duration: 1500

        });

        if (auth == 'xavese20') {
            console.log("DAPET")
            getResults();
        } else {
            console.log("GDAPET")

            navigate('/')
        }
    }, [])

    return (
        <div>
            <div className='text-center py-10'>
                <h1 className='text-3xl font-bold'>Hasil Kalkulasi </h1>
            </div>
            <Toaster></Toaster>

            <Table className='bg-gray-800 text-gray-200'>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow className='text-white'>
                        <TableHead className="w-[100px] text-white ">Nama</TableHead>
                        <TableHead className="text-white ">Kelas</TableHead>
                        <TableHead className="text-white max-w-[100px] ">Input pengguna</TableHead>
                        <TableHead className="text-white ">Skor Kategori Linguistik</TableHead>
                        <TableHead className="text-white ">Skor Kategori Naturalis</TableHead>
                        <TableHead className="text-white ">Skor Kategori Intrapersonal</TableHead>
                        <TableHead className="text-white ">Skor Kategori Matematis-Logis</TableHead>
                        <TableHead className="text-white ">Skor Kategori Interpersonal</TableHead>
                        <TableHead className="text-white ">Skor Kategori Musikal</TableHead>
                        <TableHead className="text-white ">Skor Kategori Visual-Spasial</TableHead>
                        <TableHead className="text-white ">Skor Kategori Kinestik</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataset.map((row: IResult) =>
                        <TableRow>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.class}</TableCell>
                            <TableCell className='max-w-[200px] text-clip overflow-hidden hover:overflow-auto'>{row.selected_interests}</TableCell>
                            <TableCell>{row.similarity_score_kl_1}</TableCell>
                            <TableCell>{row.similarity_score_kl_2}</TableCell>
                            <TableCell>{row.similarity_score_kl_3}</TableCell>
                            <TableCell>{row.similarity_score_kl_4}</TableCell>
                            <TableCell>{row.similarity_score_kl_5}</TableCell>
                            <TableCell>{row.similarity_score_kl_6}</TableCell>
                            <TableCell>{row.similarity_score_kl_7}</TableCell>
                            <TableCell>{row.similarity_score_kl_8}</TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table>
            <div className='text-center'>
                <Button className='hover:bg-gray-800 hover:text-gray-200 w-1/12' onClick={() => navigate('/')}>
                    Back
                </Button>
            </div>

        </div>
    )
}

export default Dashboard