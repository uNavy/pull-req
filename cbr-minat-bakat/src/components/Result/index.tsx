import React, { useEffect, useState } from 'react';

import { Card, CardHeader } from '../ui/card'; // Assuming these are Shadcn components
import { Button } from '../ui/button';
import { useLocation, useNavigate } from 'react-router-dom';


interface CosinSimData {
    [key: string]: number;
}

interface Cluster {
    cluster: string;
    category: string;
    majors: string[];
}

const oldCases = [
    {
        "cluster": "KL1",
        "cases": ["K01", "K02", "K03", "K04", "K05", "K06", "K07"],
        "category": "Linguistik",
        "majors": [
            "Jurusan Komunikasi",
            "Jurusan Sastra",
            "Jurusan Hukum",
            "Jurusan Jurnalistik"
        ]
    },
    {
        "cluster": "KL2",
        "cases": ["K08", "K09", "K10", "K11", "K12", "K13", "K14"],
        "category": "Naturalis",
        "majors": [
            "Jurusan Dokter Hewan",
            "Jurusan Peternakan",
            "Jurusan Kelautan",
            "Jurusan Kehutanan",
            "Jurusan Pertanian"
        ]
    },
    {
        "cluster": "KL3",
        "cases": ["K15", "K16", "K17", "K18", "K19", "K20", "K21"],
        "category": "Intrapersonal",
        "majors": [
            "Jurusan Teologi",
            "Jurusan Konseling",
            "Jurusan Filsafat"
        ]
    },
    {
        "cluster": "KL4",
        "cases": ["K22", "K23", "K24", "K25", "K26", "K27", "K28"],
        "category": "Matematis-Logis",
        "majors": [
            "Jurusan Akuntansi",
            "Jurusan Sains",
            "Jurusan Matematika",
            "Jurusan Aktuaria",
            "Jurusan IT dan Komputer"
        ]
    },
    {
        "cluster": "KL5",
        "cases": ["K29", "K30", "K31", "K32", "K33", "K34", "K35"],
        "category": "Interpersonal",
        "majors": [
            "Jurusan Psikologi",
            "Jurusan Sosiologi",
            "Jurusan Hubungan Internasional"
        ]
    },
    {
        "cluster": "KL6",
        "cases": ["K36", "K37", "K38", "K39", "K40", "K41", "K42"],
        "category": "Musikal",
        "majors": ["Jurusan Seni Musik"]
    },
    {
        "cluster": "KL7",
        "cases": ["K43", "K44", "K45", "K46", "K47", "K48", "K49"],
        "category": "Visual-Spasial",
        "majors": [
            "Jurusan Arsitek",
            "Jurusan Seni Lukis",
            "Jurusan Desain dan Seni"
        ]
    },
    {
        "cluster": "KL8",
        "cases": ["K50", "K51", "K52", "K53", "K54", "K55", "K56"],
        "category": "Kinestetik",
        "majors": [
            "Jurusan Olahraga",
            "Jurusan Seni Tari",
            "Jurusan Seni Peran"
        ]
    }
]

const Result: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [cosinSim, setCosinSim] = useState<CosinSimData[]>([])


    const propsData = location.state && location.state.resp;

    useEffect(() => {
        console.log(propsData.cosinSim)
        setCosinSim(propsData.cosinSim)
    }, [propsData])


    // Find the highest score

    useEffect(() => {
        const highestScore: number = Math.max(...cosinSim.map(obj => Object.values(obj)[0]));

        // Find all keys with the highest score
        const highestScoreKeys: string[] = cosinSim.reduce((keys, obj) => {
            const [key, score] = Object.entries(obj)[0];
            if (score === highestScore) {
                keys.push(key as never);
            }
            return keys;
        }, []);

        const result = oldCases.filter((item) => highestScoreKeys.includes(item.cluster));

        setResultCluster(result)

        console.log(result)


    }, [cosinSim])





    const [resultCluster, setResultCluster] = useState<Cluster[] | undefined>()




    return (
        <div className='flex items-center justify-center min-h-screen w-full bg-gray-100'>
            <Card className="bg-gray-800 px-5 py-4 text-white w-fit mx-auto">
                <CardHeader>
                    <h1 className="text-3xl font-bold">Jurusan yang diperkirakan cocok untuk anda</h1>

                </CardHeader>
                {resultCluster?.map((item: Cluster, index: number) => (
                    <div key={item.cluster}>
                        {index > 0 && <hr className="my-4 border-t border-gray-300" />}
                        <div className='px-6 pb-6'>
                            <p className="mb-2">Kategori Minat dan Bakat: {item.category}</p>
                            <p className="mb-2">Jurusan yang cocok : </p>
                            <ul className="list-disc ml-6">
                                {item.majors.map((item, index: number) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                <Button onClick={() => navigate('/')} className="   bg-blue-500 text-white hover:bg-blue-600">
                    Back
                </Button>
            </Card>
        </div>
    );
}

export default Result;
