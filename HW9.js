//Task 1

function myBlend(arr) {
    arr.sort(() => Math.random() - 0.5);
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
myBlend(arr);
console.log(arr);

//Task 2
const company = {
    name: 'Велика Компанія',
    type:'Головна компанія',
    platform: 'Платформа для продажу квитків',
    sellsSolution: 'Рішення для продажу квитків',
    clients: [
        {
            name: 'Клієнт 1',
            type: 'subCompany',
            uses: 'ПО для продажу квитків',
            sells: 'Рішення для продажу квитків',
            partners: [
                {
                    name: 'Клієнт 1.1',
                    type: 'subSubCompany',
                    uses: 'Рішення для продажу квитків',
                    sells: 'Рішення для продажу квитків',
                },
                {
                    name: 'Клієнт 1.2',
                    type: 'subSubCompany',
                    uses: 'Рішення для продажу квитків',
                    sells: 'Рішення для продажу квитків',
                    partners: [
                        {
                            name: 'Клієнт 1.2.3',
                            type: 'subSubCompany',
                            uses: 'Рішення для продажу квитків',
                            sells: 'Рішення для продажу квитків',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Клієнт 2',
            type: 'subCompany',
            uses: 'ПО для продажу квитків',
            sells: 'Рішення для продажу квитків'
        }
    ]
}


function findValueByKey(companyName, arr) {
    // Шукаємо в основному списку клієнтів
    for ( client of arr.clients) {
        if (client.name === companyName) {
            return client;
        }
        // Якщо у клієнта є партнери, шукаємо рекурсивно серед них
        if (client.partners && client.partners.length > 0) {
             check = findValueByKey(companyName, {clients: client.partners});
            if (check) {
                return check;
            }
        }
    }
    // Якщо компанія не знайдена
    return null;
}


const foundCompany = findValueByKey('Клієнт 1.2.3',company);
console.log(foundCompany);