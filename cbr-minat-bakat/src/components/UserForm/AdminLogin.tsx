import { useState } from "react";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";

const AdminLoginForm: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { toast } = useToast();

    const navigate = useNavigate();


    const handleLogin = async () => {
        // Basic validation: Check if fields are empty
        if (!userName.trim() || !password.trim()) {
            toast({
                variant: 'destructive',
                title: "User Not Found",
                description: "Username atau password tidak valid"
            });
            return;
        }

        // Simulate admin login (ganti dengan logika autentikasi sesungguhnya)
        if (userName === 'xavese20' && password === 'xaveseadmin') {
            const auth = userName
            setPassword('')
            setUserName('')


            navigate('/consultation-results', { state: { auth: auth } })

        } else {
            toast({
                variant: 'destructive',
                title: "Login Failed",
                description: "Username atau password tidak valid"
            });
        }

    };

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
            <Toaster></Toaster>
            <Card className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
                <div className="mb-4">
                    <Input
                        className="text-gray-800"
                        type="username"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        className="text-gray-800"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-between space-x-3">
                    <Button onClick={handleBack} className="bg-red-500 text-white hover:bg-red-600 w-1/2">
                        Back
                    </Button>
                    <Button onClick={handleLogin} className="bg-blue-500 text-white hover:bg-blue-600 w-1/2">
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default AdminLoginForm;