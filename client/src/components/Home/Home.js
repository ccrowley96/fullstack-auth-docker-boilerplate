import classNames from 'classnames/bind';
const cx = classNames.bind(require('./Home.module.scss'));

const Home = () => {
    return(
        <div className={cx('homeWrapper')}>
            <h3>Home page</h3>
            <i>This is public content</i>
        </div>
    );
}

export default Home;