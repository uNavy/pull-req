import React, { useState } from 'react';
import { Card, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { Toaster } from '../ui/toaster';
import { useNavigate } from 'react-router-dom';
// import {  useNavigate } from "react-router-dom";


const LandingPage: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {

    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
            <Card className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-4 text-center">Expert System</h1>
                <p className="mb-4">
                    Aplikasi ini dibuat untuk membantu siswa/i kelas 12 yang masih merasa ragu untuk menentukan jurusan dalam melanjutkan studi-nya.
                </p>
                <div className="flex justify-between space-x-4">
                    <Button onClick={() => navigate("/admin")} className="bg-blue-500 text-white hover:bg-blue-600">
                        Dashboard Admin
                    </Button>
                    <Button onClick={onContinue} className="bg-blue-500 text-white hover:bg-blue-600">
                        Lanjutkan
                    </Button>
                </div>
            </Card>
        </div>
    );
}



const UserForm: React.FC = () => {



    const navigate = useNavigate()

    const [showForm, setShowForm] = useState(false);

    const handleContinue = () => {
        setShowForm(true);
    };
    const { toast } = useToast();

    const [nama, setNama] = useState<string>('');
    const [kelas, setKelas] = useState<string>('');
    const [errors, setErrors] = useState<{ nama: string, kelas: string }>({ nama: '', kelas: '' });

    const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNama(e.target.value);
        setErrors({ ...errors, nama: '' }); // Clear the error when input changes
    };

    const handleKelasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKelas(e.target.value);
        setErrors({ ...errors, kelas: '' }); // Clear the error when input changes
    };

    const handleSubmit = () => {
        // Basic validation: Check if fields are empty
        if (nama.length < 1) {
            toast({
                variant: 'destructive',
                title: "Invalid Input",
                description: "Input pada nama tidak valid"
            });
            return
        }
        if (kelas.length < 1) {
            toast({
                variant: 'destructive',
                title: "Invalid Input",
                description: "Input pada kelas tidak valid"
            });
            return
        }

        // Check if any errors are present
        if (!errors.nama && !errors.kelas) {
            // If no errors, proceed with submission
            toast({
                title: "Ayo pilih minat dan bakat dengan benar!",
                duration: 1500, // Optional: Set the duration for how long the toast message will be displayed
            });
            navigate("/form", {state: {nama, kelas}})
        }
    };

    const handleBack = () => {
        setShowForm(!showForm)
    }


    return (
        <>{
            !showForm ? (
                <LandingPage onContinue={handleContinue} />
            )
                :
                <>
                    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
                        <Toaster></Toaster>
                        <Card className="bg-gray-800">
                            <div className="p-4">
                                <CardHeader>
                                    <h2 className="text-white text-2xl mb-4 text-center">Form Data Peserta Test</h2>
                                </CardHeader>
                                <div className="mb-4">
                                    <label htmlFor="nama" className="text-white block mb-2">Nama</label>
                                    <Input
                                        type="text"
                                        id="nama"
                                        placeholder="Masukkan nama"
                                        value={nama}
                                        onChange={handleNamaChange}
                                    />
                                    {errors.nama && <p className="text-red-500 mt-1">{errors.nama}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="kelas" className="text-white block mb-2">Kelas</label>
                                    <Input
                                        type="text"
                                        id="kelas"
                                        placeholder="Masukkan kelas"
                                        value={kelas}
                                        onChange={handleKelasChange}
                                    />
                                    {errors.kelas && <p className="text-red-500 mt-1">{errors.kelas}</p>}
                                </div>
                                <div className="flex justify-between space-x-3">
                                    <Button onClick={handleBack} className="w-1/2 bg-red-500 text-white hover:bg-red-600">
                                        Back
                                    </Button>
                                    <Button onClick={handleSubmit} className="bg-blue-500 text-white hover:bg-blue-600 w-1/2">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Card>

                    </div>

                </>
        }
        </>
    );
}

export default UserForm;
