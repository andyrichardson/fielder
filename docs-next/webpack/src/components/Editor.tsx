import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { styled } from '@linaria/react';

export const Editor = ({ code, scope }: { code: string; scope: any }) => (
  <>
    <LiveProvider
      transformCode={transformCode}
      theme={theme}
      code={code}
      scope={scope}
      noInline={true}
      spellCheck={false}
    >
      <LivePreview className="live-preview" />
      <LiveError />
      <LiveEditor className="live-editor" />
    </LiveProvider>
    <Content />
  </>
);

const transformCode = (code: any) => code.replace(/import.*;/g, '');

const theme = {
  plain: {
    fontFamily: '"Source Code Pro", monospace',
    color: '#90a4ae',
  },
  styles: [
    {
      types: ['keyword'],
      style: {
        color: '#bd93f9',
      },
    },
    {
      types: [
        'atrule',
        'boolean',
        'constant',
        'function',
        'id',
        'important',
        'keyword',
        'symbol',
      ],
      style: {
        color: '#7c4dff',
      },
    },
    {
      types: [
        'operator',
        'property',
        'punctuation',
        'attr-name',
        'builtin',
        'cdata',
        'char',
        'class',
        'inserted',
      ],
      style: {
        color: '#39adb5',
      },
    },
    {
      types: ['tag', 'url', 'variable', 'deleted', 'entity', 'selector'],
      style: {
        color: '#e53935',
      },
    },
    {
      types: [
        'attr-value',
        'attribute',
        'psuedo-element',
        'psuedo-class',
        'string',
      ],
      style: {
        color: '#f6a434',
      },
    },
  ],
};

const Content = styled.main`
  background-color: red;
`;

// // Cast to any because of incorrect type defs on lib
// // (missing spellcheck attr)
// const EditorArea: any = styled(LiveEditor)`
//   margin-top: ${scale(1)};
//   padding: 0;
//   background: #fafafa;

//   & > * {
//     padding: 28px !important;
//   }
// `;

// const Preview = styled(LivePreview)`
//   display: flex;
//   justify-content: center;
//   padding: ${scale(1)} 0;

//   form {
//     padding: ${scale(2)};
//     border: solid 2px;
//   }

//   .field {
//     margin: ${scale(1)} 0;

//     &.column {
//       flex-direction: column;
//       align-items: unset;
//     }
//   }

//   .field:first-child {
//     margin-top: 0;
//   }

//   .field label {
//     font-weight: bold;
//     display: inline-block;
//     width: ${scale(7)};
//   }

//   .field input[type='text'],
//   .field input[type='password'],
//   .field input[type='number'],
//   .field select {
//     width: 200px;
//     font-family: Inter, sans-serif;
//     font-weight: 600;
//     font-size: ${scale(0)};
//     border: solid 2px;
//     padding: ${scale(-6)} ${scale(-4)};

//     &:focus {
//       outline: none;
//     }
//   }

//   .field input[type='checkbox'] {
//     margin: 0;
//     margin-left: ${scale(1)};
//     margin-right: ${scale(0)};
//     width: ${scale(1)};
//     height: ${scale(1)};
//     appearance: none;
//     outline: solid 2px;
//     outline-offset: 0;
//     border: solid 2px #fff;
//   }

//   .field input:checked {
//     background: #000;
//   }

//   button.primary {
//     margin: 0 auto;
//     font-size: ${scale(0)};
//     font-weight: bold;
//     padding: ${scale(-4)};
//     background: transparent;
//     border: solid 2px;
//     float: right;

//     &:focus {
//       outline: none;
//     }
//   }
// `;
// export default Editor;
