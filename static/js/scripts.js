

const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'patents', 'awards']


window.addEventListener('DOMContentLoaded', event => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById("logo");
    
    // 读取 localStorage 里的主题设置
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode'); // 启用暗色模式
    }
    
    // 监听按钮点击，切换明暗模式
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    
        // 存储用户偏好到 localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            logo.src = "static/assets/img/jhu_logo_dark.png";
            themeToggle.innerText = '☀️'; // 变成太阳图标
        } else {
            localStorage.setItem('theme', 'light');
            logo.src = "static/assets/img/jhu_logo.png"; 
            themeToggle.innerText = '🌙'; // 变成月亮图标
        }
    });

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    })

}); 
