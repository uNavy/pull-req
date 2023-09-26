import  { useState, useEffect } from 'react';
import { Button } from '../ui/button';
// import { useToast } from '../ui/use-toast';
import { Checkbox } from '../ui/checkbox';
import { Card, CardHeader } from '../ui/card';
import { useToast } from '../ui/use-toast';
// import { Toast } from '../Toast';
import { Toaster } from '../ui/toaster';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const interests = [
  {
    "code": "K01",
    "description": "Menyukai baca buku"
  },
  {
    "code": "K02",
    "description": "Menyukai membuat karangan puisi"
  },
  {
    "code": "K03",
    "description": "Menyukai berbicara dan bercerita"
  },
  {
    "code": "K04",
    "description": "Menyukai kegiatan menulis atau membuat karangan cerita"
  },
  {
    "code": "K05",
    "description": "Suka mengutarakan atau bertukar ide dengan orang lain ataupun berdebat"
  },
  {
    "code": "K06",
    "description": "Menyukai permainan olah kata, seperti berpantun, bermain teka-teki, dll."
  },
  {
    "code": "K07",
    "description": "Menyukai pelajaran bahasa (Bahasa Indonesia ataupun Bahasa Asing)"
  },
  {
    "code": "K08",
    "description": "Senang memiliki hewan peliharaan atau bercocok tanam"
  },
  {
    "code": "K09",
    "description": "Senang mempelajari ilmu pengetahuan alam"
  },
  {
    "code": "K10",
    "description": "Peduli terhadap lingkungan"
  },
  {
    "code": "K11",
    "description": "Menyukai tamasya ke kebun binatang, taman, laut, akuarium, dll."
  },
  {
    "code": "K12",
    "description": "Senang pergi berkemah atau berpetualang di alam bebas"
  },
  {
    "code": "K13",
    "description": "Senang mengoleksi serangga, mengoleksi botol, mengoleksi daun kering, dan mengoleksi benda alam lainnya"
  },
  {
    "code": "K14",
    "description": "Menyukai kegiatan memancing"
  },
  {
    "code": "K15",
    "description": "Menyiapkan rencana masa depan serta tujuan yang mau dicapai"
  },
  {
    "code": "K16",
    "description": "Lebih memilih menghabiskan waktu di dalam rumah dan sendirian"
  },
  {
    "code": "K17",
    "description": "Memilih bekerja ataupun belajar sendiri dibandingkan harus belajar atau bekerja bersama tim atau teman"
  },
  {
    "code": "K18",
    "description": "Sering memikirkan mengenai kehidupan maupun diri sendiri"
  },
  {
    "code": "K19",
    "description": "Mengenali kelebihan dan kekurangan yang dimiliki dalam diri sendiri"
  },
  {
    "code": "K20",
    "description": "Gagasan atau ide, cerita kenangan, sesuatu yang terjadi sering saya tuangkan dalam catatan harian"
  },
  {
    "code": "K21",
    "description": "Memiliki pertimbangan yang tinggi saat menentukan keputusan"
  },
  {
    "code": "K22",
    "description": "Menyukai ilmu sains atau matematika"
  },
  {
    "code": "K23",
    "description": "Lebih tertarik pada permainan yang mengandalkan strategi dan mengasah cara berpikir contohnya permainan catur, maze, dll"
  },
  {
    "code": "K24",
    "description": "Senang pelajaran ilmu pengetahuan"
  },
  {
    "code": "K25",
    "description": "Sering menyelesaikan soal matematika saat sedang tidak ada kerjaan"
  },
  {
    "code": "K26",
    "description": "Senang bermain komputer dan tertarik untuk mengetahui bagaimana komputer bekerja"
  },
  {
    "code": "K27",
    "description": "Memiliki ingatan yang kuat pada angka atau statistik"
  },
  {
    "code": "K28",
    "description": "Jarang mengandalkan jari ataupun menggunakan alat bantu hitung dalam menyelesaikan soal hitungan"
  },
  {
    "code": "K29",
    "description": "Mudah bergaul dan bersosialisasi dengan orang sekitar"
  },
  {
    "code": "K30",
    "description": "Mudah beradaptasi dengan teman atau orang baru"
  },
  {
    "code": "K31",
    "description": "Lebih menyukai belajar secara berkelompok daripada belajar sendiri"
  },
  {
    "code": "K32",
    "description": "Tidak segan menawarkan atau memberikan bantuan saat orang lain kesusahan"
  },
  {
    "code": "K33",
    "description": "Dapat dengan mudah paham perasaan teman hanya dari ekspresi wajah"
  },
  {
    "code": "K34",
    "description": "Memiliki kemampuan meningkatkan semangat kerja tim atau teman dalam bekerja"
  },
  {
    "code": "K35",
    "description": "Sering menjadi tempat curhat, atau menjadi penyemangat emosi dan dimintai saran serta pendapat"
  },
  {
    "code": "K36",
    "description": "Dapat memainkan instrumen atau alat musik dengan mudah"
  },
  {
    "code": "K37",
    "description": "Memiliki hobi bernyanyi atau mendengarkan musik"
  },
  {
    "code": "K38",
    "description": "Dapat dengan mudah mengingat melodi atau nada pada musik"
  },
  {
    "code": "K39",
    "description": "Dapat dengan mudah mengenali jenis lagu yang berbeda"
  },
  {
    "code": "K40",
    "description": "Sering menggunakan anggota tubuh untuk menghasilkan suara musik"
  },
  {
    "code": "K41",
    "description": "Senang bersenandung atau bernyanyi saat melaksanakan pekerjaan"
  },
  {
    "code": "K42",
    "description": "Dapat menciptakan atau menulis lagu"
  },
  {
    "code": "K43",
    "description": "Menyukai permainan puzzle atau lego"
  },
  {
    "code": "K44",
    "description": "Menyukai dunia fotografi"
  },
  {
    "code": "K45",
    "description": "Menyukai seni gambar atau lukis"
  },
  {
    "code": "K46",
    "description": "Dapat belajar dengan cara mengamati pekerjaan orang sekitar"
  },
  {
    "code": "K47",
    "description": "Memiliki ingatan yang tinggi pada gambar, grafik, dan bagan"
  },
  {
    "code": "K48",
    "description": "Memiliki daya ingat yang tinggi pada tempat, jalan walaupun belum terlalu sering mengunjunginya"
  },
  {
    "code": "K49",
    "description": "Memiliki ingatan mudah saat mengenali wajah dibandingkan mengingat nama seseorang"
  },
  {
    "code": "K50",
    "description": "Menyukai olahraga"
  },
  {
    "code": "K51",
    "description": "Sering menggerakkan jari, alat tulis, goyang kaki ketika belajar dan berpikir"
  },
  {
    "code": "K52",
    "description": "Lebih banyak bergerak saat belajar"
  },
  {
    "code": "K53",
    "description": "Menyukai permainan sandiwara (akting) serta menari"
  },
  {
    "code": "K54",
    "description": "Lebih suka beraktivitas di alam bebas atau di luar ruangan"
  },
  {
    "code": "K55",
    "description": "Lebih memilih praktik langsung saat belajar sesuatu"
  },
  {
    "code": "K56",
    "description": "Senang bergerak dan mudah bosan saat hanya duduk dalam waktu lama"
  }
]




export function OptionSelector() {

  const navigate = useNavigate()

  const location = useLocation()

  const propsData = location.state && location.state;


  const [currentPage, setCurrentPage] = useState(0);
  const interestsPerPage = 8;

  const paginatedInterests = interests.slice(
    currentPage * interestsPerPage,
    (currentPage + 1) * interestsPerPage
  );

  function handleBack() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    const totalPages = Math.ceil(interests.length / interestsPerPage);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  const { toast } = useToast();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  function toggleInterest(interestCode: string) {
    if (selectedInterests.includes(interestCode)) {
      setSelectedInterests(selectedInterests.filter((code) => code !== interestCode));
    } else {
      setSelectedInterests([...selectedInterests, interestCode]);
    }
  }

  const handleSubmit = async()=> {

    if (selectedInterests.length > 0) {
      toast({
        duration: 1000,
        variant: 'default',
        title: "Sistem sedang melakukan kalkulasi"
      })
    } else {
      toast({
        variant: 'destructive',
        title: "Pilihan Minat Bakat Anda:",
        description: "Anda belum memilih minat bakat."
      });
    }

    const result = await axios.post("https://api.sistem-pakar-jurusan.my.id/api/submit-interests", {
      name: propsData.nama,
      class: propsData.kelas,
      selectedInterests:selectedInterests
    })

    const resp = result.data

    navigate('/result', { state: { resp } })



  }

  useEffect(() => {
    console.log(selectedInterests)
  }, [selectedInterests])

  return (
    <>
      <Card className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md">
        <CardHeader className="text-center text-2xl mb-4">Pilih Minat dan Bakat Anda</CardHeader>
        <div className='item-center'>
          {/* {propsData} */}
          {paginatedInterests.map((interest) => (
            <div key={interest.code} className="mb-4 bg-gray-600 px-4 py-3 rounded-lg">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={selectedInterests.includes(interest.code)}
                  onCheckedChange={() => toggleInterest(interest.code)}
                  style={{ border: '1px solid white' }}
                />
                <div>{interest.description}</div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <Button className='hover:bg-white hover:text-black' onClick={handleBack} disabled={currentPage === 0}>
            Back
          </Button>
          {currentPage < Math.ceil(interests.length / interestsPerPage) - 1 ? (
            <Button className='hover:bg-white hover:text-black' onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-blue-500 text-white hover:bg-blue-600">
              Submit
            </Button>
          )}
        </div>
      </Card>
      <Toaster></Toaster>
    </>

  );
}
