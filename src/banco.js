// Simulação de "banco de dados" com arrays para horários, dias e bairros
const banco = [
    { 
        nome: "Asu", 
        bairro: ["Centro"], 
        dia: ["tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["dinner"], 
        hora: "19:00 - 22:30",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Babilônia", 
        bairro: ["Batel"], 
        dia: ["monday", "tuesday", "wednesday", "thursday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:30 - 22:30",
        takeaway: false, 
        petFriendly: false,
        feriado: false,
        dataComemorativa: false 
    },
    { 
        nome: "Carlo Ristorante", 
        bairro: ["Agua Verde"], 
        dia: ["monday","tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["dinner"], 
        hora: "19:00 - 22:45",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: false 
    },
    { 
        nome: "Chateau de Gazon", 
        bairro: ["Batel"], 
        dia: ["monday","tuesday", "wednesday", "thursday"], 
        horario: ["dinner"], 
        hora: "18:30 - 23:00",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: false 
    },
        { 
        nome: "Chez Margot", 
        bairro: ["Bigorrilho"], 
        dia: ["tuesday", "wednesday", "thursday", "friday"], 
        horario: ["lunch"], 
        hora: "12:00 - 16:00",
        takeaway: false, 
        petFriendly: false,
        feriado: false,
        dataComemorativa: true 
    },
    { 
        nome: "Coco Bambu", 
        bairro: ["Centro", "Mossunguê"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:30 - 22:30",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    }, //tour acabou aqui no comtemporaneo
    { 
        nome: "Cacau Noir", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["dinner"], 
        hora: "19:00 - 22:45",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Carnivore", 
        bairro: ["Agua Verde", "Tarumã", "Vila Izabel"], 
        dia: ["monday","tuesday", "wednesday", "thursday",], 
        horario: ["lunch", "dinner"], 
        hora: "11:30 - 22:00",
        takeaway: false, 
        petFriendly: false,
        feriado: false,
        dataComemorativa: false 
    },
    { 
        nome: "Carnivore", 
        bairro: ["Agua Verde", "Tarumã", "Vila Izabel"], 
        dia: ["sunday"], 
        horario: ["dinner"], 
        hora: "18:30 - 23:00",
        takeaway: false, 
        petFriendly: false,
        feriado: false,
        dataComemorativa: false 
    },
    { 
        nome: "Cheirin Bão", 
        bairro: ["Agua Verde"], 
        dia: ["monday", "tuesday", "wednesday", "thursday", "friday"], 
        horario: ["brunch", "lunch"], 
        hora: "09:00 - 20:00",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Cheirin Bão", 
        bairro: ["Agua Verde"], 
        dia: ["saturday"], 
        horario: ["brunch", "lunch"], 
        hora: "09:00 - 19:00",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Cheirin Bão", 
        bairro: ["Agua Verde"], 
        dia: ["sunday"], 
        horario: ["lunch"], 
        hora: "12:00 - 18:00",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Didge Steakburguer", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:30 - 22:45",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Fames Pizzaria Mix", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:00 - 23:00",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Guacamole Taqueria", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:30 - 22:30",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Jardin de la Bière", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:00 - 23:00",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Kenzo Sushi", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["lunch"], 
        hora: "11:00 - 15:00",
        takeaway: false, 
        petFriendly: true,
        feriado: false,
        dataComemorativa: false 
    },
    { 
        nome: "Milk Creamery", 
        bairro: ["Agua Verde"], 
        dia: ["monday", "tuesday", "wednesday", "thursday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:30 - 22:30",
        takeaway: true, 
        petFriendly: false,
        feriado: false,
        dataComemorativa: false 
    },
    { 
        nome: "Milk Creamery", 
        bairro: ["Agua Verde"], 
        dia: ["sunday"], 
        horario: ["dinner"], 
        hora: "18:00 - 22:30",
        takeaway: true, 
        petFriendly: false,
        feriado: false,
        dataComemorativa: false 
    },
    { 
        nome: "Poke to Wok", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], 
        horario: ["lunch", "dinner"], 
        hora: "11:00 - 22:15",
        takeaway: false, 
        petFriendly: false,
        feriado: true,
        dataComemorativa: true 
    },
    { 
        nome: "Recanto Mineiro", 
        bairro: ["Agua Verde"], 
        dia: ["sunday","monday", "tuesday", "thursday"], 
        horario: ["dinner"], 
        hora: "18:00 - 22:30",
        takeaway: false, 
        petFriendly: true,
        feriado: true,
        dataComemorativa: true 
    },
    //próximo muller
];
