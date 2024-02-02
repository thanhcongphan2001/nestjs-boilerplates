import { DataSource, DataSourceOptions } from 'typeorm';


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres', // Loại cơ sở dữ liệu, ví dụ: 'mysql', 'postgres', 'sqlite',...
    host: 'localhost', // Địa chỉ host của cơ sở dữ liệu
    port: 5432,
    username: 'postgres', // Tên người dùng cơ sở dữ liệu
    password: '123456',
    database: 'bts',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions);



// Bạn có thể khởi tạo kết nối ở đây hoặc trong file khác
dataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
export default dataSource;