import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Placeholder logo */}
        <div className="mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-white/10 shadow-2xl ring-4 ring-white/20 backdrop-blur-md">
          <Camera className="h-16 w-16 text-primary-foreground" />
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
          Sistema de Captura ESP32-CAM
        </h1>
        <p className="mb-2 text-lg text-primary-foreground/80 sm:text-xl">
          Universidad Nacional de Chimborazo
        </p>
        <p className="mb-10 max-w-md text-sm text-primary-foreground/60">
          Plataforma de visualización y gestión de imágenes capturadas por dispositivos ESP32-CAM
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            size="lg"
            onClick={() => navigate("/gallery")}
            className="rounded-full bg-white px-8 py-6 text-lg font-semibold text-primary shadow-xl transition-transform hover:scale-105 hover:bg-white/90"
          >
            Ir a Galería
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
