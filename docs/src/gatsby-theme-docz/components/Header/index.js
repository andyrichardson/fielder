/** @jsx jsx */
import { jsx, Box, Flex, useColorMode } from 'theme-ui';
import { useConfig, useCurrentDoc, useComponents } from 'docz';
import * as styles from 'gatsby-theme-docz/src/components/Header/styles';
import {
  Edit,
  Menu,
  Sun,
  Github,
} from 'gatsby-theme-docz/src/components/Icons';
import { Logo } from 'gatsby-theme-docz/src/components/Logo';

export const Header = (props) => {
  const { onOpen } = props;
  const {
    repository,
    themeConfig: { showDarkModeSwitch, showMarkdownEditButton },
  } = useConfig();
  const doc = useCurrentDoc();
  const [colorMode, setColorMode] = useColorMode();

  const link = `${repository}/tree/master/docs/${doc.filepath}`;

  return (
    <div sx={styles.wrapper} data-testid="header">
      <Box sx={styles.menuIcon}>
        <button sx={styles.menuButton} onClick={onOpen}>
          <Menu size={25} />
        </button>
      </Box>
      <div sx={styles.innerContainer}>
        <Logo />
        <Flex>
          {repository && (
            <Box sx={{ mr: 2 }}>
              <a
                href={repository}
                sx={styles.headerButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={15} />
              </a>
            </Box>
          )}
        </Flex>
        {showMarkdownEditButton && (
          <a
            sx={styles.editButton}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Edit width={14} />
            <Box sx={{ pl: 2 }}>Edit on GitHub</Box>
          </a>
        )}
      </div>
    </div>
  );
};
