module.exports = {

    commands: [
        ['styles', {
            fileId: 'fzYhvQpqwhZDUImRz431Qo',
            outputters: [
                require('@proxy-figma-export/output-styles-as-sass')({
                    output: './output'
                })
            ]
        }],

        ['components', {
            fileId: 'fzYhvQpqwhZDUImRz431Qo',
            onlyFromPages: ['icons'],
            transformers: [
                require('@proxy-figma-export/transform-svg-with-svgo')({
                    plugins: [
                        { removeViewBox: false },
                        { removeDimensions: true }
                    ]
                })
            ],
            outputters: [
                require('@proxy-figma-export/output-components-as-svg')({
                    output: './output'
                }),
                require('@proxy-figma-export/output-components-as-es6')({
                    output: './output'
                })
            ]
        }]
    ]

};
