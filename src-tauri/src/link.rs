use regex::{Captures, Regex};

pub async fn check_md_links(file: String) {}

pub enum Link {
    Valid(String, String),
    Invalid(String, String),
}

fn find_wikilinks(file: String) -> Vec<(String, String)> {
    let re = Regex::new(
        r"\[\[(?:(((?:[^\]\[|\\]|\\.)+))|(?:((?:[^\]\[|\\]+|\\.)+)\|((?:[^\]\[|\\]+|\\.)+)))\]\]",
    )
    .unwrap();
    re.captures_iter(&file)
        .map(|c| {
            if let Some(_) = c.get(1) {
                (c[1].trim().to_string(), c[2].trim().to_string())
            } else {
                (c[3].trim().to_string(), c[4].trim().to_string())
            }
        })
        .collect::<Vec<(String, String)>>()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn matches_simple_wikilinks() {
        let test_text = "This is a simple [[wikilink]]. It does not have display text.";
        let result = find_wikilinks(test_text.into());
        assert_eq!(vec![("wikilink".into(), "wikilink".into())], result)
    }

    #[test]
    fn matches_complex_wikilinks() {
        let test_text = "This is a complex [[wikilink.com|wikilink]]. It has custom display text.";
        let result = find_wikilinks(test_text.into());
        println!("{:?}", result);
        assert_eq!(vec![("wikilink.com".into(), "wikilink".into())], result)
    }

    #[test]
    fn matches_multiple_wikilinks() {
        let test_1 = "This is a [[wikilink]]. Here is another one: [[google.com]]. Wow!";
        let result_1 = find_wikilinks(test_1.into());
        assert_eq!(
            vec![
                ("wikilink".into(), "wikilink".into()),
                ("google.com".into(), "google.com".into())
            ],
            result_1
        );

        let test_2 = "This is a [[wikilink.com/test|wikilink]]. Here is another one: [[google.com/search|Google]]. Wow!";
        let result_2 = find_wikilinks(test_2.into());
        assert_eq!(
            vec![
                ("wikilink.com/test".into(), "wikilink".into()),
                ("google.com/search".into(), "Google".into())
            ],
            result_2
        );

        let test_3 = "This is a whole bunch of wikilinks: [[wikilink]] wow [[google.com/search|Google]] oh boy! [[webkins.com]]";
        let result_3 = find_wikilinks(test_3.into());
        assert_eq!(
            vec![
                ("wikilink".into(), "wikilink".into()),
                ("google.com/search".into(), "Google".into()),
                ("webkins.com".into(), "webkins.com".into())
            ],
            result_3
        )
    }

    #[test]
    fn matches_wikilinks_at_start_and_finish() {
        let test_text = "[[wikilink]] at the start and one at the [[ending_link|wow]]";
        let result = find_wikilinks(test_text.into());
        assert_eq!(
            vec![
                ("wikilink".into(), "wikilink".into()),
                ("ending_link".into(), "wow".into())
            ],
            result
        )
    }

    #[test]
    fn wikilinks_lose_leading_and_trailing_whitespace() {
        let result_1 = find_wikilinks("[[test_text]]".into());
        let result_2 = find_wikilinks("[[ test_text ]]".into());
        assert_eq!(result_1, result_2);

        let result_3 = find_wikilinks("[[test_text|test text 2]]".into());
        let result_4 = find_wikilinks("[[ test_text | test text 2 ]]".into());
        assert_eq!(result_3, result_4)
    }

    #[test]
    fn wikilinks_may_only_have_one_bar() {
        let test_text =
            "This wikilink is valid: [[valid wikilink]]. This one isn't: [[invalid|wikilink|here]]";
        let result = find_wikilinks(test_text.into());
        assert_eq!(
            vec![("valid wikilink".into(), "valid wikilink".into())],
            result
        );
    }

    #[test]
    fn does_not_match_escaped_wikilinks() {
        let test_text = r"[[valid wikilink]] ... [[valid wikilink \]]] [[invalid wikilink\]]";
        let result = find_wikilinks(test_text.into());
        assert_eq!(
            vec![
                ("valid wikilink".into(), "valid wikilink".into()),
                (r"valid wikilink \]".into(), r"valid wikilink \]".into())
            ],
            result
        );
    }
}
